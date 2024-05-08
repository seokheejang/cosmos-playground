package client

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)


func GRPClient() error {
	myAddress, err := sdk.AccAddressFromBech32("cosmos1fl48vsnmsdzcv85q5d2q4z5ajdha8yu34mf0eh")
	if err != nil {
			return err
	}

	// Create a connection to the gRPC server.
	grpcConn, err := grpc.Dial(
			"127.0.0.1:9090", // your gRPC server address.
			grpc.WithInsecure(), // The Cosmos SDK doesn't support any transport security mechanism. 
			// This instantiates a general gRPC codec which handles proto bytes. We pass in a nil interface registry
			// if the request/response types contain interface instead of 'nil' you should pass the application specific codec.
	grpc.WithDefaultCallOptions(grpc.ForceCodec(codec.NewProtoCodec(nil).GRPCCodec())),
)
	if err != nil {
			return err
	}
	defer grpcConn.Close()

	// This creates a gRPC client to query the x/bank service.
	bankClient := banktypes.NewQueryClient(grpcConn)
	bankRes, err := bankClient.Balance(
			context.Background(),
			&banktypes.QueryBalanceRequest{Address: myAddress.String(), Denom: "atom"},
	)
	if err != nil {
			return err
	}

	fmt.Println("res:", bankRes.GetBalance()) // Prints the account balance

	return nil
}
